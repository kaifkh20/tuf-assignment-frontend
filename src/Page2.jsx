import { Flex, Table, TableContainer, Th,Tr, Thead, Tbody, Td,Heading,Box, Spinner, Text, Alert, AlertDescription,AlertTitle,AlertIcon} from "@chakra-ui/react";
import { useEffect,useState } from "react";

const backEndApi = "https://tuf-assignment-backend-at6z.onrender.com"

export default function Page2(){
    
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backEndApi}/data`);
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading){
    return (
      <Flex width={"100vw"} height={"100vh"} direction={"column"} justifyContent={"center"} alignItems={"center"} >
        <Spinner size={"xl"}/>
        <Text fontSize={"3xl"}>Loading...</Text>
      </Flex>
    )
  } ;

  

  if (error){
    return (
      <Alert
        status='error'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='100vh'
      >
        <AlertIcon boxSize='40px' mr={0} />
        <AlertTitle mt={4} mb={1} fontSize='lg'>
          Error
        </AlertTitle>
        <AlertDescription maxWidth='sm'>
          There was an error processing your request :-(
        </AlertDescription>
      </Alert>
    )
  }

  // console.log(data);


  return (
      <Flex direction={"column"}>

        <Box padding={"1rem"} backgroundColor={"#282a3a"} color={"#fff"}>
          <Heading m={4}>Submissions.</Heading>
        </Box>

        <Box overflowX={"none"} overflowY={"scroll"}>
        <TableContainer marginTop={"1rem"} padding={"10px"} >
          <Table fontSize={"14px"} size={"md"} variant={"striped"}>
            <Thead>
              <Tr>
                <Th>
                  Username
                </Th>
                <Th>
                  Code Language
                </Th>
                <Th>
                  Source Code
                </Th>
                <Th>
                  Stdin
                </Th>
                <Th>
                  Stdout
                </Th>
                
                <Th>
                  Timestamp
                </Th>
              </Tr>
              
            </Thead>

            <Tbody>
              {data.map(({id,username,codeLanguage,stdInput,submissionTimeStamp,sourceCode,submissionOutput})=>{
                return(
                  <Tr id={id}>
                    <Td>{username}</Td>
                    <Td>{codeLanguage}</Td>
                    <Td>{`${sourceCode.substr(0,100)}`}<b>. . .</b></Td>
                    <Td>{stdInput}</Td> 
                    <Td>{submissionOutput}</Td>
                    <Td>{submissionTimeStamp}</Td>
                </Tr>
                )
              })}
            </Tbody>

          </Table>
        </TableContainer>
        </Box>
      </Flex>
  );
}
