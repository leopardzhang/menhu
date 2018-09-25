const inDev = process.env.NODE_ENV === 'development';

/**
 * 日志方法
 * @method
 * @param {Object} args 参数列表
 */
export default function (...args) {
    if (inDev) {
        console.info(args);
    }
}
