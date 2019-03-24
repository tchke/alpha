const versions = [
    '1.0.0',
    '1.1.5',
    '1.1.7',
    '1.1.90',
    '1.1.190',
    '1.2.0',
    '1.3.7',
    '1.2.2',
    '1.2.5',
    '1.3.0',
    '3.3.1'
];

function deriveNextPart(versions, version, index) {
    if (index === version.length) {
        return version.join('.');
    }

    if (!version[index]) {
        version[index] = versions
            .map(o => o[index])
            .reduce((a, c) => {
                const prevVal = +a;
                const curVal = +c;
                return prevVal < curVal ? c : a;
            });
    }

    return deriveNextPart(
        versions.filter((v) => {
            return v[index] === version[index];
        }),
        version,
        ++index);
}

function getVersion(version) {
    version = version.split('.');
    version.length = 3;

    console.log(deriveNextPart(
        versions.map((v) => {
            return v.split('.');
        }), version, 0));
}
// select latest version by part of version
getVersion('1.1'); // → 1.1.190
getVersion('1.1.7'); // → 1.1.7
getVersion('1.2'); // → 1.2.5
getVersion('1.'); // → 1.3.7
