
const Iterator = (systemData) => {
    let Star = systemData.star && systemData.star.name[0];
    let Planet = systemData.planet &&  systemData.planet.name[0];
    let Binary = systemData.binary && systemData.binary.map((binary, i) => {
        return Iterator(binary);
      });
      return (
        <>
          {/* {Binary} */}
          {Star}
          {Planet}
        </>
      );
}


const NewSystemNav = ({systemData}) => {

    console.log({systemData});
    return(<mesh></mesh>)
    
}
export default NewSystemNav;