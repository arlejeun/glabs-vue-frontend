import type {NavigationGuardNext, RouteLocationNormalized, Router } from "vue-router";
import { msalInstance, loginRequest } from '@/plugins/msal/msalConfig'
import { InteractionType, PublicClientApplication, type RedirectRequest } from "@azure/msal-browser";

export function registerGuard(router: Router) {
    router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
        if (to.meta.requiresAuth) {
            const request = {
                ...loginRequest,
                redirectStartPage: to.fullPath
            }
            const shouldProceed = await isAuthenticated(msalInstance, InteractionType.Redirect, request);
            console.log(shouldProceed)
            if (shouldProceed) {
                return next()
            } else {
                return next({ name: 'not-authorized', query: { redirect: to.fullPath }})
            }
        }
    
        return next();
    });
}

export async function isAuthenticated(instance: PublicClientApplication, interactionType: InteractionType, loginRequest: RedirectRequest): Promise<boolean> {    
    // If your application uses redirects for interaction, handleRedirectPromise must be called and awaited on each page load before determining if a user is signed in or not  
    return instance.handleRedirectPromise().then(() => {
        const accounts = instance.getAllAccounts();
        if (accounts.length > 0) {
            return true;
        }

        // User is not signed in and attempting to access protected route. Sign them in.
        if (interactionType === InteractionType.Redirect) {
            return instance.loginRedirect(loginRequest).then(() => {
                return true;
            }).catch(() => {
                return false;
            });
        }

        return false;
    }).catch(() => {
        return false;
    });
}