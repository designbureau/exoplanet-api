const SystemNav = ({ systemData }) => {
  return (
    <nav className="systemNav">
      {systemData.name[0]}
      {console.log("full system info", systemData)}
    </nav>
  );
};
export default SystemNav;
