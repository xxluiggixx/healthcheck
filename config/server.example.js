const servers = [
    {
        name: 'nginx-https',
        host: '10.0.0.2',
        username: 'root',
        tomcats:[
            {
                name: 'Saplic-01',
                host: '192.10.2.1',
                port: 8200,
                available: true
            },
            {
                name: 'Saplic-02',
                host: '192.10.2.1',
                port: 8200,
                available: true
            },
            {
                name: 'Saplic-03',
                host: '192.10.2.1',
                port: 8200,
                available: false
            }      
        ]
    },
    {
        name: 'nginx-tomcat',
        host: '192.14.21.1',
        username: 'root',
        tomcats:[
            {
                name: 'T-01',
                host: '192.14.21.1',
                port: 8200,
                available: true
            }
        ]
    },
    ];
    

module.exports = servers ;