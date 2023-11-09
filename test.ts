async function main() {
    const res=await fetch("http://localhost:3000/api/login",{
        "method":"POST",
        "headers":{
            "content-type":"application/json"
            
        },
        "body":JSON.stringify({"email":"hiromu.at@icloud.com"}),
        "credentials":"include"
    })
    console.log(res)
}
main()