curl -XPOST https://vision-api.eyeem.com/v1/analyze \       -H "Authorization: Bearer b1m7u1c7dtsntnsope4vj5cqr6b3fffkse5jj52m" \       -H "Content-Type: application/json" -d '{   "requests":[      {         "tasks":[            {               "type":"TAGS"            },            {               "type":"CAPTIONS"            },            {               "type":"AESTHETIC_SCORE"            }         ],         "image":{            "url":"https://static.pexels.com/photos/24205/pexels-photo.jpg"         }      }   ]}'



{
   "requests":[
      {
         "tasks":[
            {
               "type":"TAGS"
            },
            {
               "type":"CAPTIONS"
            },
            {
               "type":"AESTHETIC_SCORE"
            }
         ],
         "image":{
            "url":$scope.image_src
         }
      }
   ]
}