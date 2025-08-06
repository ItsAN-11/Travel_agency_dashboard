import { ID, OAuthProvider, Query } from "appwrite"
import { account, appwriteConfig, database } from "~/appwrite/client"
import { redirect } from "react-router"

export const loginWithGoogle = async () => {
    try {
        account.createOAuth2Session(OAuthProvider.Google)
    } catch(e){
        console.log('loginWithGoogle',e)
    }
}
export const getUser = async () => {
    try {
            const user = await account.get();

            if(!user) redirect('/sign-in');
            const { documents } = await database.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.userCollection,
                [
                    Query.equal('accountId', user.$id),
                    Query.select( ['name', 'email', 'imageUrl', 'joinedAt', 'accountId']  )

                ]
            )
    } catch(e){
        console.log(e)
    }
}
export const getGooglePicture = async () => {
    try {
        // Get current OAuth session
        const session = await account.getSession('current');
        // get the OAuth2 token from the session
        const accessToken = session.providerAccessToken;

                if (!accessToken) {
                    console.log("No OAuth token available");
                    return null;
                } 
                
                
                //Make a request to the google people API to get the profile photo
                const response = await fetch(
            'https://people.googleapis.com/v1/people/me?personFields=photos',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if(!response.ok){
            console.log("Failed to fetch profile photo fom google people API");
            return null;
        }

        const data = await response.json();
        // Get the first photo URL
        const photoUrl = data.photos && data.photos.length > 0
        ? data.photos[0].url
        :null;
        
        return photoUrl;
        } catch(e){
        console.log("getGoogle Pivture error: ",e);
        return null;
    }

}
export const logoutUser = async () => {
    try {
        await account.deleteSession('current');
        return true;
    } catch(e){
        console.log('logoutUser error',e);
        return false;
    }
}



export const storeUserData = async () => {
    try {
        const user = await account.get();

        if(!user) return null;

        const { documents } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollection,
            [Query.equal('accountId', user.$id)]
        );
        if (documents.length > 0) return documents[0];

        const imageUrl = await getGooglePicture(); 

        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollection,
            ID.unique(),
            {
                accountId:user.$id,
                email: user.email,
                name: user.name,
                imageUrl: imageUrl || '',
                joinedAt: new Date().toISOString()
            }

        );
        return newUser;
    } catch(e){
        console.log("Error at storeUserData: ",e);
        return null;
    }
}
export const getExistingUser = async () => {
    try {
        const user= await account.get();

        if(!user) return null;

        const { documents } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollection,
            [Query.equal('accountId', user.$id)]
        );

        if (documents.length === 0) return null;
    } catch(e){
        console.log("Error at getExistingUser: ",e);
        return null;
    }
}

