
const webWorker = () => {
    let jwt = '';
    let checkInterval = null;

    onmessage = async (e) => {
        const { type, jwt: newJwt } = e.data;

        if (type === 'start') {
            console.log("worker: start");
            jwt = newJwt;

            if (checkInterval) {
                clearInterval(checkInterval);
            }

            checkInterval = setInterval(async () => {
                await checkTokenExpiration();
            }, 300000); // 5 分鐘檢查一次

            await checkTokenExpiration();
        }
        else if (type === 'refreshToken') {
            clearInterval(checkInterval);
        }
    };

    async function checkTokenExpiration() {
        if (!jwt) {
            console.log("worker: no token, get token");
            postMessage({ type: 'getToken' });
            setTimeout(() => {
                checkTokenExpiration();
            }, 60000);
            return;
        }

        const decoded = decodeJwt(jwt);
        const expTime = decoded.exp * 1000;
        const currentTime = Date.now();

        console.log('Checking token expiration...');

        if (currentTime >= expTime) {
            console.log('Token has expired, clearing token...');
            jwt = '';
            postMessage({ type: 'getToken' });
            return;
        }

        const nearExpiry = expTime - currentTime <= 600000;

        if (nearExpiry) {
            console.log('Token is about to expire, refreshing...');
            postMessage({ type: 'refreshToken' });
        }
    }

    function decodeJwt(token) {
        const payload = token.split('.')[1];
        const decoded = atob(payload);
        return JSON.parse(decoded);
    }
}


let code = webWorker.toString()
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"))
const blob = new Blob([code], { type: 'application/javascripts' })
const workerScript = URL.createObjectURL(blob)

export default workerScript;