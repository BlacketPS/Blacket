const useGenerate = () => {
    const getQRCode = () => new Promise((resolve, reject) => fetch.patch("/api/settings/otp/generate").then(res => resolve(res)).catch(reject));

    return getQRCode;
}

export default useGenerate;