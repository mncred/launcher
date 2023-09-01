// stringToUuid generates static UUID v4 for any string.
exports.stringToUuid = (str) => {
    const dict = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
    const codes = str.trim().toLowerCase()
        .split('')
        .map(v => v.charCodeAt(0))
        .map(v => v % dict.length)
        .map(v => dict[v])
    let pointer = 0
    const next = (n = 1) => {
        const seq = []
        for (let i = 0; i < n; i++) {
            seq.push(codes[pointer % codes.length])
            pointer++
        }
        return seq.join('')
    }
    return `${next(8)}${next(4)}4${next(3)}${next(4)}${next(12)}`
}