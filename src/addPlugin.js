const fetch = require('cross-fetch')
const fs = require('fs-extra')
const path = require('path')
export function downloadFile(args) {
    const directory = args.directory
    const cookieHeader = args.cookies.map(e => e.name + '=' + e.value).join(';')
    const userAgent = args.userAgent || 'cross-fetch'
    const fileName = args.fileName

    return fetch(args.url, {
        headers: { Cookie: cookieHeader, 'User-Agent': userAgent },
    }).then(response => {
        if (!response) {
            throw new Error('No response')
        }

        if (response.status !== 200) {
            throw new Error('Bad status code: ' + response.status)
        }
        return response.arrayBuffer()
    }).then(function(arrayBuffer){
            const file = path.join(directory, fileName)
            let myBuffer = new Uint8Array(arrayBuffer)
            fs.outputFileSync(file, myBuffer)
            return 'downloadFile ' + file + ' downloaded'
    })
}
