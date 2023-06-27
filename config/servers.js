const servers = [
    {
        name: 'nginx-https',
        host: '10.19.240.39',
        port: 22,
        username: 'root',
        password: 'P=1q-alz',
        tomcats:[
            {
                name: 'Saplic-01',
                host: '10.19.240.41',
                host_int: '192.168.50.41',
                port: 8200,
                available: true
            },
            {
                name: 'Saplic-02',
                host: '10.19.240.42',
                host_int: '192.168.50.42',
                port: 8200,
                available: true
            },
            {
                name: 'Saplic-03',
                host: '10.19.240.43',
                host_int: '192.168.50.43',
                port: 8200,
                available: true
            },
            {
                name: 'Saplic-04',
                host: '10.19.240.44',
                host_int: '192.168.50.44',
                port: 8200,
                available: true
            },
            {
                name: 'Saplic-05',
                host: '10.19.240.45',
                host_int: '192.168.50.45',
                port: 8200,
                available: true
            },
            {
                name: 'Saplic-06',
                host: '10.19.240.46',
                host_int: '192.168.50.46',
                port: 8200,
                available: true
            },        
            {
                name: 'Saplic-Prepro',
                host: '10.19.252.195',
                host_int: '10.19.252.195',
                port: 8200,
                available: true
            },        
            {
                name: 'Saplic-Migra',
                host: '10.18.250.167',
                host_int: '10.18.250.167',
                port: 8096,
                available: true
            }        
        ]
    },
    {
        name: 'nginx-IE-http',
        host: '10.18.250.246',
        port: 22,
        username: 'root',
        password: 'P=1q-alz',
        tomcats:[
            {
                name: 'T-01',
                host: '10.18.250.240',
                host_int: '192.168.50.40',
                port: 8200,
                available: true
            },
            {
                name: 'T-02',
                host: '10.18.250.239',
                host_int: '192.168.50.39',
                port: 8200,
                available: true
            },
            {
                name: 'T-03',
                host: '10.18.250.238',
                host_int: '192.168.50.38',
                port: 8200,
                available: true
            },
            {
                name: 'T-04',
                host: '10.18.250.237',
                host_int: '192.168.50.37',
                port: 8200,
                available: false
            },
            {
                name: 'T-05',
                host: '10.18.250.236',
                host_int: '192.168.50.36',
                port: 8200,
                available: false
            },
            {
                name: 'T-IE-Prepro',
                host: '10.18.250.235',
                host_int: '192.168.50.35',
                port: 8200,
                available: true
            }        
        ]
    },
    ];
    

module.exports = servers ;