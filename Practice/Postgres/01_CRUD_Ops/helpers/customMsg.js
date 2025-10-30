// export const createError = (statusCode, message)=>{
//     const err = new Error(message)
//     err.statusCode = statusCode; 
//     return err
// }

// export const createSuccess = (statusCode, message)=>{
//     statusCode = statusCode || 200;
//     return {
//         success: true,
//         status: statusCode,
//         message
//     }
// }

// export function success (res, message = 'Success', data = {},code=200) {
//     res.json({ code: code, message: message, data: data });
// }

// export function failed (res, message = 'Failed', code = 100) {
//     res.json({ code: code, message: message })
// }

// helpers/customMsg.js
export function success(res, message = "Success", data = {}, code = 200) {
  return res.status(code).json({ success: true, code, message, data });
}

export function failed(res, message = "Failed", code = 400) {
  return res.status(code).json({ success: false, code, message });
}
