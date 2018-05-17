# InstaMessage-Server  

-- Server Endpoint Documentation --  
Last Updated: 5/14/2018  
Root URL: http://insta-message.herokuapp.com  
  
Title: Get All Organization Info  
  + URL: /organization/all  
  Method: GET  
  URL Params: N/A  
  Data Params: N/A  
  <Success Response>  
    Code: 200  
    Content: { data : [  
        {  
            "name": "Colourhood",  
            "hours": "Mon, Tue, Wed, Thur, Fri,",  
            "services": "1, 2, 3, 4"  
        },  
        {  
            "name": "Union Gospel Mission",  
            "hours": "Mon, Tue, Wed, Thur, Fri, Sat, Sun",  
            "services": "1, 2, 3, 4, 5, 6, 7, 8"  
        },  
        ...  
      ]  
    }  
  <Error Response>  
    Code: 500  
    Content: { error : error }  
  
Title: Get An Organizations Info  
  URL: /organization/:name  
  Method: GET  
  URL Params: name=[string]  
  Data Params: N/A  
  <Success Response>  
    Code: 200  
    Content: { data : [  
        {  
            "name": "Colourhood",  
            "hours": "Mon, Tue, Wed, Thur, Fri,",  
            "services": "1, 2, 3, 4"  
        }  
      ]  
    }  
  <Error Response>  
    Code: 500  
    Content: { error : error }  
  
Title: Create A User  
  URL: /user/create  
  Method: POST  
  URL Params: N/A  
  Data Params: {  
    username: [string],  
    password: [string]  
  }  
  <Success Response>  
    Code: 200  
    Content: none  
  <Error Response>  
    Code: 401  
    Content: none  
  
Title: User Login  
  URL: /user/login  
  Method: POST  
  URL Params: N/A  
  Data Params: {  
    username: [string],  
    password: [string]  
  }  
  <Success Response>  
    Code: 200  
    Content: none  
  <Error Response>  
    Code: 401  
    Content: none  
