# MongoDB

 Doc-oriented stored data model.
 
# DB on Premise, not in Cloud-based Cluster

https://github.com/QuinoaPy/MongoDB_NodeApp

# NoSQL, 不只是 SQL
  
  https://pattyappier.blog/2019/01/23/not-only-sql-無關聯式資料庫不只是關連/

# Doc-Oriented Collection, 文件導向存儲的資料集合

  https://pattyappier.blog/2019/01/25/doc-oriented-db-文件模型的-nosql-資料庫結構/
  
  可以支援 web 環境下的數據資料，以集合 collection 資料型態儲存，每個集合都是由多筆 Doc 文件組成，每筆文件均為 JSON 格式。（其他 noSQL 還有列式和鍵值對，共三種資料庫。）
  
  https://github.com/QuinoaPy/Cassandra (Column-Oriented, 列式存儲的資料集合)
  
  https://github.com/QuinoaPy/RedisNoSQL (K/V-Oriented, 鍵值對存儲的資料集合)
  

# Intro, 簡介

當使用者在使用後端所開發的網站或手機前端的應用程式時，會產生對應資料，例如：Ａuth 登入驗證、Cart 購物車，這些資料需要儲存在後端後方的 DB 管理，這就是資料管理系統。

相較於關聯式資料庫，儲存前要先定義每個欄位 cloumn (即 field) 的資料型態，之後便僅能在對應的欄位儲存對應型態的資料，而資料庫中擁有多個資料表，資料表之間可以利用 id 建立關聯，並且透過資料表結構 schema 確認資料表中各種資料間的關聯。

然而近年來，網站系統訪問量攀升，產生大筆多筆的資料數據，許多資料庫因為讀寫頻率高，導致性能問題產生，關聯式資料庫也因為欄位要預先設定型別，但是當寫入的資料太龐大時，這對資料庫管理員來說會越來越複雜和面對壓力。這時，非關聯式資料庫出場！它補足了關聯式資料庫的不足，增加擴增和彈性。

相對於關聯式資料庫是利用 Row 行式來建立資料表 Table 和 schemat，非關聯式則是利用 k/v 鍵值對或是 column 列式格式存儲資料集合 collection，而 MongoDB 則是使用 json 文件型態料儲存的方式，其中 id 會由 MongoDB 自動產生，編號不會重複！

# Cloud Data Storage, 雲端存儲

  https://pattyappier.blog/2019/01/17/cloud-datastore-應用程式非關聯性式儲存機制/
  
# support BSON data type

It is a computer data interchange format. 

The name "BSON" is based on the term JSON and stands for "Binary JSON". It is a binary form for representing simple or complex data structures including associative arrays (also known as name-value pairs), integer indexed arrays, and a suite of fundamental scalar types. 

BSON originated in 2009 at MongoDB. Several scalar data types are of specific interest to MongoDB and the format is used both as a data storage and network transfer format for the MongoDB database, but it can be used independently outside of MongoDB. Implementations are available in a variety of languages such as C, C++, C#, Erlang, Go, Java, JavaScript, Lua, Perl, PHP, Python, Ruby, Scala, Smalltalk, and Swift.

BSON data-exchange format improves CRUD performance, but using more space.=>
Compared to JSON, BSON is designed to be efficient both in storage space and scan-speed. Large elements in a BSON document are prefixed with a length field to facilitate scanning. In some cases, BSON will use more space than JSON due to the length prefixes and explicit array indices.

# other data exchange type

* CBOR，Concise Binary Object Representation
* Protocol Buffer
* Object-oriented
* ASN.1
* XML
* Wireless Binary XML
* Sereal
  https://metacpan.org/pod/Sereal
* UBJSON
* Smile
  
# Install MongoDB

COMPONENTS

  mongod - The database server.
  mongos - Sharding router.
  mongo  - The database shell (uses interactive javascript).

UTILITIES

  mongodump         - Create a binary dump of the contents of a database.
  mongorestore      - Restore data from the output created by mongodump.
  mongoexport       - Export the contents of a collection to JSON or CSV.
  mongoimport       - Import data from JSON, CSV or TSV.
  mongofiles        - Put, get and delete files from GridFS.
  mongostat         - Show the status of a running mongod/mongos.
  bsondump          - Convert BSON files into human-readable formats.
  mongoreplay       - Traffic capture and replay tool.
  mongotop          - Track time spent reading and writing data.
  install_compass   - Installs MongoDB Compass for your platform.

BUILDING

  See docs/building.md.

RUNNING

  For command line options invoke:

    $ ./mongod --help （cd to bin dir）

  To run a single server database:

    $ sudo mkdir -p /data/db
    $ ./mongod
    $
    $ # The mongo javascript shell connects to localhost and test database by default:
    $ ./mongo
    > help

INSTALLING COMPASS

  You can install compass using the install_compass script packaged with MongoDB:

    $ ./install_compass

  This will download the appropriate MongoDB Compass package for your platform
  and install it.

DRIVERS

  Client drivers for most programming languages are available at
  https://docs.mongodb.com/manual/applications/drivers/. Use the shell
  ("mongo") for administrative tasks.
  
# 下載 MongoDB 於本機的實作 

    $ cd mongodb-macos-x86_64-4.2.0

    $ ls
     LICENSE-Community.txt		
     THIRD-PARTY-NOTICES
     MPL-2				
     THIRD-PARTY-NOTICES.gotools
     README				
     bin

    $ cd bin

    $ ./mongod --help
    
    $ cd bin
    
    $ ./install_compass
    
    Downloading the package...
    Installing the package...
    Copying MongoDB Compass Community.app to /Applications
    Cleaning up...
    Done!
    
# 執行 mongod 和 mongo 指令

    $ cd bin
    $ ./mongod

I  CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'

I  CONTROL  [initandlisten] MongoDB starting : pid=87634 port=27017 dbpath=/data/db 64-bit host=katesapp2019de-MacBook-Pro.local

I  CONTROL  [initandlisten] db version v4.2.0
I  CONTROL  [initandlisten] git version: a4b751dcf51dd249c5865812b390cfd1c0129c30
I  CONTROL  [initandlisten] allocator: system
I  CONTROL  [initandlisten] modules: none
I  CONTROL  [initandlisten] build environment:
I  CONTROL  [initandlisten]     distarch: x86_64
I  CONTROL  [initandlisten]     target_arch: x86_64
I  CONTROL  [initandlisten] options: {}
I  STORAGE  [initandlisten] exception in initAndListen: IllegalOperation: Attempted to create a lock file on a read-only directory: /data/db, terminating

I  NETWORK  [initandlisten] shutdown: going to close listening sockets...
I  NETWORK  [initandlisten] removing socket file: /tmp/mongodb-27017.sock
I  -        [initandlisten] Stopping further Flow Control ticket acquisitions.
I  CONTROL  [initandlisten] now exiting
I  CONTROL  [initandlisten] shutting down with code:100

# SRV, service record

    _minecraft._tcp.example.com. 86400 IN SRV 0 5 25565 mc.example.com.
    
    _service._proto.name. TTL class SRV priority weight port target.
    
service: the symbolic name of the desired service.

proto: the transport protocol of the desired service (TCP or UDP)

name: domain name

TTL: standard DNS time to live field.

class: standard DNS class field (IN).

priority: the priority of the target host, lower value means more preferred.

weight: A relative weight for records with the same priority, higher value means higher chance of getting picked.

port: the TCP or UDP port on which the service is to be found.

target: the canonical hostname of the machine providing the service, ending in a dot.

A Service record (SRV record) is a spec of data in the DNS defining the location, i.e., the hostname and port number, of servers for services. It is defined in RFC 2782, and its type code is 33. 

Some Internet protocols such as the Session Initiation Protocol (SIP) and the Extensible Messaging and Presence Protocol (XMPP) often require SRV support by network elements.

# MogoDB CLI

     Options:
       --networkMessageCompressors arg (=snappy,zstd,zlib)
                                             Comma-separated list of compressors to 
                                             use for network messages

     General options:
       -h [ --help ]                         Show this usage information
       --version                             Show version information
       -f [ --config ] arg                   Configuration file specifying 
                                             additional options
       --configExpand arg                    Process expansion directives in config 
                                             file (none, exec, rest)
       --ipv6                                Enable IPv6 support (disabled by 
                                             default)
       --listenBacklog arg (=128)            Set socket listen backlog size
       --maxConns arg (=1000000)             Max number of simultaneous connections
       --pidfilepath arg                     Full path to pidfile (if not set, no 
                                             pidfile is created)
       --timeZoneInfo arg                    Full path to time zone info directory, 
                                             e.g. /usr/share/zoneinfo
       --nounixsocket                        Disable listening on unix sockets
       --unixSocketPrefix arg                Alternative directory for UNIX domain 
                                             sockets (defaults to /tmp)
       --filePermissions arg                 Permissions to set on UNIX domain 
                                             socket file - 0700 by default
       --fork                                Fork server process
       -v [ --verbose ] [=arg(=v)]           Be more verbose (include multiple times
                                             for more verbosity e.g. -vvvvv)
       --quiet                               Quieter output
       --port arg                            Specify port number - 27017 by default
       --logpath arg                         Log file to send write to instead of 
                                             stdout - has to be a file, not 
                                             directory
       --syslog                              Log to system's syslog facility instead
                                             of file or stdout
       --syslogFacility arg                  syslog facility used for mongodb syslog
                                             message
       --logappend                           Append to logpath instead of 
                                             over-writing
       --logRotate arg                       Set the log rotation behavior 
                                             (rename|reopen)
       --timeStampFormat arg                 Desired format for timestamps in log 
                                             messages. One of ctime, iso8601-utc or 
                                             iso8601-local
       --setParameter arg                    Set a configurable parameter
       --bind_ip arg                         Comma separated list of ip addresses to
                                             listen on - localhost by default
       --bind_ip_all                         Bind to all ip addresses
       --noauth                              Run without security
       --transitionToAuth                    For rolling access control upgrade. 
                                             Attempt to authenticate over outgoing 
                                             connections and proceed regardless of 
                                             success. Accept incoming connections 
                                             with or without authentication.
       --slowms arg (=100)                   Value of slow for profile and console 
                                             log
       --slowOpSampleRate arg (=1)           Fraction of slow ops to include in the 
                                             profile and console log
       --auth                                Run with security
       --clusterIpSourceWhitelist arg        Network CIDR specification of permitted
                                             origin for `__system` access
       --profile arg                         0=off 1=slow, 2=all
       --cpu                                 Periodically show cpu and iowait 
                                             utilization
       --sysinfo                             Print some diagnostic system 
                                             information
       --noscripting                         Disable scripting engine
       --notablescan                         Do not allow table scans
       --keyFile arg                         Private key for cluster authentication
       --clusterAuthMode arg                 Authentication mode used for cluster 
                                             authentication. Alternatives are 
                                             (keyFile|sendKeyFile|sendX509|x509)

     Replication options:
       --oplogSize arg                       Size to use (in MB) for replication op 
                                             log. default is 5% of disk space (i.e. 
                                             large is good)

     Replica set options:
       --replSet arg                         arg is <setname>[/<optionalseedhostlist
                                             >]
       --enableMajorityReadConcern [=arg(=1)] (=1)
                                             Enables majority readConcern

     Sharding options:
       --configsvr                           Declare this is a config db of a 
                                             cluster; default port 27019; default 
                                             dir /data/configdb
       --shardsvr                            Declare this is a shard db of a 
                                             cluster; default port 27018

     Storage options:
       --storageEngine arg                   What storage engine to use - defaults 
                                             to wiredTiger if no data files present
       --dbpath arg                          Directory for datafiles - defaults to 
                                             /data/db
       --directoryperdb                      Each database will be stored in a 
                                             separate directory
       --syncdelay arg (=60)                 Seconds between disk syncs (0=never, 
                                             but not recommended)
       --noIndexBuildRetry                   Do not retry any index builds that were
                                             interrupted by shutdown
       --upgrade                             Upgrade db if needed
       --repair                              Run repair on all dbs
       --journal                             Enable journaling
       --nojournal                           Disable journaling (journaling is on by
                                             default for 64 bit)

     TLS Options:
       --tlsOnNormalPorts                    Use TLS on configured ports
       --tlsMode arg                         Set the TLS operation mode 
                                             (disabled|allowTLS|preferTLS|requireTLS
                                             )
       --tlsCertificateKeyFile arg           Certificate and key file for TLS
       --tlsCertificateKeyFilePassword arg   Password to unlock key in the TLS 
                                             certificate key file
       --tlsClusterFile arg                  Key file for internal TLS 
                                             authentication
       --tlsClusterPassword arg              Internal authentication key file 
                                             password
       --tlsCAFile arg                       Certificate Authority file for TLS
       --tlsClusterCAFile arg                CA used for verifying remotes during 
                                             inbound connections
       --tlsCRLFile arg                      Certificate Revocation List file for 
                                             TLS
       --tlsDisabledProtocols arg            Comma separated list of TLS protocols 
                                             to disable [TLS1_0,TLS1_1,TLS1_2]
       --tlsAllowConnectionsWithoutCertificates 
                                             Allow client to connect without 
                                             presenting a certificate
       --tlsAllowInvalidHostnames            Allow server certificates to provide 
                                             non-matching hostnames
       --tlsAllowInvalidCertificates         Allow connections to servers with 
                                             invalid certificates
       --tlsFIPSMode                         Activate FIPS 140-2 mode at startup
       --tlsCertificateSelector arg          TLS Certificate in system store
       --tlsClusterCertificateSelector arg   SSL/TLS Certificate in system store for
                                             internal TLS authentication
       --tlsLogVersions arg                  Comma separated list of TLS protocols 
                                             to log on connect [TLS1_0,TLS1_1,TLS1_2
                                             ]

     Free Monitoring Options:
       --enableFreeMonitoring arg            Enable Cloud Free Monitoring 
                                             (on|runtime|off)
       --freeMonitoringTag arg               Cloud Free Monitoring Tags

     WiredTiger options:
       --wiredTigerCacheSizeGB arg           Maximum amount of memory to allocate 
                                             for cache; Defaults to 1/2 of physical 
                                             RAM
       --wiredTigerJournalCompressor arg (=snappy)
                                             Use a compressor for log records 
                                             [none|snappy|zlib|zstd]
       --wiredTigerDirectoryForIndexes       Put indexes and data in different 
                                             directories
       --wiredTigerMaxCacheOverflowFileSizeGB arg (=0)
                                             Maximum amount of disk space to use for
                                             cache overflow; Defaults to 0 
                                             (unbounded)
       --wiredTigerCollectionBlockCompressor arg (=snappy)
                                             Block compression algorithm for 
                                             collection data [none|snappy|zlib|zstd]
       --wiredTigerIndexPrefixCompression arg (=1)
                                             Use prefix compression on row-store 
                                             leaf pages

# Robo 3T Studio

  plz wait...
  
# Discussion
  
BUG REPORTS

  See https://github.com/mongodb/mongo/wiki/Submit-Bug-Reports.


DOCUMENTATION

  https://docs.mongodb.com/manual/


LEARN MONGODB

  https://university.mongodb.com/
