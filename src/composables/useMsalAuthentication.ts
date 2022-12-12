import { type AuthenticationResult, AuthError, InteractionStatus, InteractionType, type PopupRequest, type RedirectRequest, type SilentRequest } from "@azure/msal-browser";
import { type Ref, ref, watch } from 'vue'
import { useMsal } from '@/composables/useMsal'

export type MsalAuthenticationResult = {
    acquireToken: Function;
    result: Ref<AuthenticationResult|null>;
    error: Ref<AuthError|null>;
    inProgress: Ref<boolean>;
}

export function useMsalAuthentication(interactionType: InteractionType, request: PopupRequest|RedirectRequest|SilentRequest): MsalAuthenticationResult {
    const { instance, inProgress } = useMsal();

    const localInProgress = ref<boolean>(false);
    const result = ref<AuthenticationResult|null>(null);
    const error = ref<AuthError|null>(null);

    const acquireToken = async (requestOverride?: PopupRequest|RedirectRequest|SilentRequest) => {
        if (!localInProgress.value) {
            localInProgress.value = true;
            const tokenRequest = requestOverride || request;

            try {
                const response = await instance.acquireTokenSilent(tokenRequest);
                result.value = response;
                error.value = null;
            } catch(e) {
                if (inProgress.value !== InteractionStatus.None) {
                    return;
                }

            //    if (interactionType === InteractionType.Redirect) {
            //         await instance.loginRedirect(tokenRequest).catch((e) => {
            //             error.value = e;
            //             result.value = null;
            //         });
            //     }
            };
            localInProgress.value = false;
        }
    }

    acquireToken();
    
    return {
        acquireToken,
        result,
        error,
        inProgress: localInProgress
    }
}