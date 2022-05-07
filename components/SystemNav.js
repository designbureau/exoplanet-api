const SystemNav = ({ systemData }) => {
  return (
    <nav className="systemNav">
      {systemData.name}
      {console.log("full system info", systemData)}
    </nav>
  );
};
export default SystemNav;
