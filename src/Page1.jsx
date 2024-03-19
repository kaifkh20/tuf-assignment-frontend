import { useState,createElement } from "react";
import { Box, Flex, Text, Textarea,Select,Accordion,AccordionButton,AccordionPanel,AccordionItem,AccordionIcon, Input, Button } from "@chakra-ui/react";
import { redirect } from "react-router-dom";



export default function Page1(){

    const [lineCount,setLineCount] = useState(1)

    const [numberChild,setNumberChild] = useState([createElement("span",null,lineCount)])

    // numberChild.push()

    // console.log(numberChild);

    async function handleSubmit(e){
        e.preventDefault()
        const form = new FormData(e.target)

        

        const data = {
            username : form.get("username"),
            language : form.get("language"),
            stdinput : form.get("stdinput"),
            sourceCode : form.get("sourcecode")
        }
        console.log(data);


        const response = await fetch('http://localhost:3000/form',{
            method : "post",
            headers : {'Content-type' : "application/json"},
            body : JSON.stringify(data)
        })

        
        if(response.ok){
            return redirect('/page2')
            console.log("success");
        }else console.log("error")
        // const formData = new FormData(e.target)
        // console.log(formData);
    }

    return (

        <form method="post" onSubmit={handleSubmit}>

        <Flex justifyContent={"space-between"} height="100vh" >

            
            <Flex width={"30vw"} justifyContent={"center"} alignItems={"center"} direction={"column"}>
                
                <Box marginBottom={"50px"}>
                    <img src="public/rocket.svg" width={"70px"}></img>
                </Box>

                <Box>
                    <Text fontSize='4xl'>Run Your Code.</Text>
                </Box>

                <Box marginTop={"1rem"}>
                    <Text>Username</Text>
                    <Input name="username" size={"md"} width={""}></Input>
                </Box>

                <Box marginTop={"1rem"}> 
                    <Button type="submit" colorScheme="teal" variant="outline">Run Code</Button>
                </Box>

                <Box cursor={"pointer"} width={"100%"}  maxWidth={"30vw"} position={"fixed"} bottom={"0"} >
                <Accordion allowToggle width={"100%"} padding={"10px"} >
                    <AccordionItem >
                        <h2>
                        <AccordionButton backgroundColor={"#ccc"}>
                            <Box as="span" flex='1' textAlign='left'>
                                <Text>Standard Input</Text>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} backgroundColor={"#282a3a"} color={"#fff"}>
                            <Textarea name="stdinput" placeholder="Enter your Input" _focusVisible={"none"} border={"none"} resize={"none"}></Textarea>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
                </Box>
            </Flex>

            <Flex width={"70vw"} backgroundColor={"#282a3a"} color={"#fff"} padding={"10px"}>

                <Flex direction={"column"} width={"100%"} >
                    
                <Flex  justifyContent={"center"} alignItems={"center"} margin={"0"} padding={"0"} marginBottom={"1rem"}>
                    <Select width={"30%"} placeholder="Select Your Language" name="language" size={'sm'}>
                        <option value='cpp'>C++</option>
                        <option value='java'>Java</option>
                        <option value='javascript'>Javascript</option>
                        <option value='python'>Python</option>
                    </Select>
                </Flex>

                <Flex direction={"row"} height={"100%"}>
                    <Flex direction={"column"} className="numbers" color={"#506882"} textAlign={"right"} fontSize={"15px"} width={"20px"} marginRight={"10px"}  >
                        {numberChild.map((child)=>child)}
                    </Flex>
                    <Textarea  size={"100%"} fontSize={"1rem"} padding={"0"} _focusVisible={"none"} border={"none"} 
                        backgroundColor={"#282a3a"} height={"100%"} resize={"none"} 
                        name="sourcecode" placeholder="//Write your code here" 
                        onKeyDown={(e)=>{


                            if(e.key==="Tab"){

                            
                            e.preventDefault()
                            var start = e.target.selectionStart;
                            var end = e.target.selectionEnd;

                            // set textarea value to: text before caret + tab + text after caret
                            e.target.value = e.target.value.substring(0, start) +
                            "\t" + e.target.value.substring(end);

                            // put caret at right position again
                            e.target.selectionStart =
                            e.target.selectionEnd = start + 1;
                        }
                        if(e.key === "Enter"){
                            // const numbers = document.querySelector(".numbers")
                            setLineCount(lineCount+1)
                            numberChild.push(createElement("span",null,lineCount+1))
                        }
                    
                    }}
                        onPaste={(e)=>{
                            e.preventDefault()
                            const text = e.clipboardData.getData("text/plain") 
                            // const nol = text.split(/\r\n|\r|\n/).length

                            // event.isTrusted = true
                            const lines = text.split("\n")
                            for(const line of lines){
                                e.target.value = e.target.value + line
                            }
                        }}
                        >

                    </Textarea>
                </Flex>

                </Flex>

                

            </Flex>

        </Flex>
        
        </form>
       
    )
}

// <form method="post" onSubmit={handleSubmit}>
// <input name="username" type="text" placeholder="Username"/>
// <select name="language">
//     <option value="cpp">C++</option>
//     <option value="java">Java</option>
//     <option value="javascript">Javascript</option>
//     <option value="python">Python</option>
// </select>
// {/* <input name="stdinput" type="text" placeholder="Standard Input"/> */}
// <textarea name="stdinput" id="" cols="10" rows="10" placeholder="Standard Input"></textarea>
// <textarea name="sourcecode" id="" cols="30" rows="10"></textarea>
// <button type="submit">Run</button>
// </form>