import { ReadContracts } from "../../../components/ReadContracts";
import { InvestorArea } from "../../../components/area/investor";


export default function InvestorPage(props: any) {  

  return (
    <div>
      
	  {
		 props.isStarted ? <div>Is started</div> : <div>Not started</div>
	  }
    </div>

  );
}
