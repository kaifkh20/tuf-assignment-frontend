import Page1 from "./Page1";
import Page2 from "./Page2";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import {ChakraProvider} from "@chakra-ui/react"

export default function App(){
    return (
        <ChakraProvider>
        <BrowserRouter>
        <Routes>
            <Route path="/page1" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />}/>
        </Routes>
        </BrowserRouter>
        </ChakraProvider>
    )
}