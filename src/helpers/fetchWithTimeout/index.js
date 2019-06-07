export default function (url, options, timeout = 10000) {
    return Promise.race([
        fetch(url,options),
        new Promise((resolve, reject) => {
            setTimeout(() => reject(new Error('Timeout')), timeout)
        })
    ])
}