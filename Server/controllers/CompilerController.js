const express = require('express')
const request=require('request');
const CompilerController ={
    compile: async (req,res)=>
    {
        console.log('compiling');
          //getting the required data from the request
          const code = req.body.code;
          const language = req.body.language;
          const input = req.body.input;
      
          var output;
      
          const data = ({
              script : code,
              language: language,
              stdin: input,
              versionIndex: "0",
              clientId: "68b4ba8607c4881ec70e408c569d8cec",
              clientSecret:"ae90f023a140410523692ee888687414aa56a703b5ae859a815e795db52ed956"
          });
      
          
          request({
              url: 'https://api.jdoodle.com/v1/execute',
              method: "POST",
              json: data
          },
          
          
          
         function out(error, response, body) {   

              output=body.output;
              res.send(output)
          }        
    )}
    
}

module.exports = CompilerController;