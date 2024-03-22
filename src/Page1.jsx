import { useState,createElement } from "react";
import { Box, Flex,Link, Text, Textarea,Select,Accordion,AccordionButton,AccordionPanel,AccordionItem,AccordionIcon,Alert,AlertTitle,AlertIcon,AlertDescription, Input, Button } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

const backEndApi = "https://tuf-assignment-backend-at6z.onrender.com"

async function handleSubmit(e){
    e.preventDefault()
    const form = new FormData(e.target)

    const data = {
        username : form.get("username"),
        language : form.get("language"),
        stdinput : form.get("stdinput"),
        sourceCode : form.get("sourcecode")
    }


    const response = await fetch(`${backEndApi}/form`,{
        method : "post",
        headers : {'Content-type' : "application/json"},
        body : JSON.stringify(data)
    })

    
    if(!response.ok){
        return new Error("There was some error") 
    }

}

export default function Page1(){

    const [lineCount,setLineCount] = useState(1)

    const [numberChild,setNumberChild] = useState([createElement("span",null,lineCount)])

    const [error,setError] = useState(false)

    const [success,setSuccess] = useState(null)

    if(success===true){
        return <Navigate to={"/page2"}></Navigate>
    }

//     if(error){
//         return (
            
//     )
//   }
    

    return (

        <>
        
        <Alert
                status='error'
                variant='subtle'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='100vh'
                display={error ? "flex" : "none"}
                zIndex={"100"}
            >
                <AlertIcon boxSize='40px' mr={0} />
                <AlertTitle mt={4} mb={1} fontSize='lg'>
                Error
                </AlertTitle>
                <AlertDescription as={"em"} maxWidth='sm'>
                    There was an error processing your request :-(
                </AlertDescription>
                <Text fontSize={"xs"}>
                    Wait for 2 seconds..
                </Text>
            </Alert>

        <form method="post" onSubmit={async(e)=>{
            try{
                await handleSubmit(e)
                setSuccess(true)
            }catch(e){
                setError(true)
                setSuccess(null)
                setTimeout(()=>{
                    setError(false)
                },1500)
            }
        }}>

        <Flex justifyContent={"space-between"} height="100vh" >

            
            <Flex width={"30vw"} justifyContent={"center"} alignItems={"center"} direction={"column"}>
                
                <Box position={"fixed"} top={"10"}>
                <Button>
                    <Link href="/page2">Show Submissions</Link>
                </Button>
                </Box>

                <Box marginBottom={"50px"}>
                    <img src="images/rocket.svg" width={"70px"}></img>
                </Box>

                <Box>
                    <Text fontSize='4xl'>Run Your Code.</Text>
                </Box>

                <Box marginTop={"1rem"}>
                    <Text>Username</Text>
                    <Input required={true} name="username" size={"md"} width={""}></Input>
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
                    <Select required={true} width={"30%"} placeholder="Select Your Language" defaultValue={'cpp'} name="language" size={'sm'}>
                        <option value='C++'>C++</option>
                        <option value='Java'>Java</option>
                        <option value='JavaScript'>Javascript</option>
                        <option value='Python'>Python</option>
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
                        >

                    </Textarea>
                </Flex>

                </Flex>

                

            </Flex>

        </Flex>
        
        </form>
       </>
    )
}
