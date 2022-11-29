import { useNotification } from "@kyvg/vue3-notification";


const handleAxiosError = (error: any, message: string) => {
  let result = {...error};
  let serverResp = result?.response?.data;
  if (typeof(serverResp)=='object' && serverResp?.message?.length > 0) {
    return `${message}. ${result?.message} - ${serverResp.message}. Please reach out to Global Technical Sales`
  }
  else {
    result.description = `Error: ${message}`
    return result.description;
  }
}




export { handleAxiosError }