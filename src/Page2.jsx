import { Flex, Table, TableContainer, Th,Tr, Thead, Tbody, Td,Heading,Box } from "@chakra-ui/react";
import { useEffect,useState } from "react";

export default function Page2(){
    
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/data');
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

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error;

  console.log(data);

//   const usernameList = data.map(({id,username,codeLanguage,stdInput,timeStamp})=>{
//     <ul>
//         <h3>{id}</h3>
//         <li>
//         {username}
//         </li>
//         <li>
//         {codeLanguage}
//     </li>
//     <li>
//         {stdInput}
//     </li>
//     <li>
//         {timeStamp}
//     </li>
//     </ul>
//   })


  return (
      <Flex direction={"column"}>

        <Box padding={"1rem"} backgroundColor={"#282a3a"} color={"#fff"}>
          <Heading m={4}>Submissions.</Heading>
        </Box>

        <Box overflowX={"scroll"}>
        <TableContainer marginTop={"1rem"}>
          <Table fontSize={"14px"} padding={"10px"} size={"md"}>
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

// {data.map(({id,username,codeLanguage,stdInput,submissionTimeStamp,sourceCode,submissionOutput})=>{
//   return (
//       <div key={id}>
//       <p>{username}</p>
//       <p>{codeLanguage}</p>
//       <p>{stdInput}</p>
//       <p>{sourceCode.substr(0,100)}</p>
//       <p>{submissionOutput}</p>
//       <p>{submissionTimeStamp}</p>
//       </div>
//   )
// })
// }