import { graphConfig } from '@/plugins/msal/msalConfig'


export async function callMsGraph(accessToken: string) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(graphConfig.userProfileEndpoint, options)
        .then(response => response.json())
        .catch(error => {
            console.log(error);
            throw error;
        });
}
