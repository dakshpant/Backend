export const otp = ()=>{
    return Math.floor(1000 + Math.random() * 90000).toString();
}
export const otpExpire = ()=>{
    return new Date(Date.now() + 5 * 60 * 1000); // 5 min
}