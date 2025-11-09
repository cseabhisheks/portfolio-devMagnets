import Intro from "./Intro"
import Service from "./service/Service"
import Pricing from "./Pricing"
import Recommendation from "./Recommendation"
export default function Home() {
    return (<>
        <Intro />
        <Service />
        <Pricing />
    
        <Recommendation/>
    </>)
}