const ldap = require('ldapjs');
const { promisify } = require ('util');

const client = ldap.createClient({

   url: "ldap://ldap:389"

});

// promisify shall define !!!

client.bind = promisfy(client.bind);
client.search = promisify(client.search);

/*search users in LDAP dir, naming ldap_search
 @param cn_search type string - cn_value 
 @return Promise
*/

module.exports = async function ldap_search(cn_search=""){

 // to define options for search

    const opts = {
	   filter:'(&(objectClass=person)(uid=${cnSearch ? `*${cnSearch}*` : "*"}))',
      scope: "sub",
      attribute:["db", "cn", "mail", "uid", "sn", "givenname"]
    };

    await client.bind("cn=admin, dc=example, dc=org", opts);

    const users = await client.search("dc=example, dc=org", opts);

    const users = [];

    return new Promise((resolve, reject) => {

      search.on("searchEntry", function(entry){

         const user = entry.object;
         user.push(user); 

      });

      search.on("end", ()=>{

	      return resolve(users);

      });

      search.on("error", function(error){

         return reject(error);
     
       });

    });
}; 
