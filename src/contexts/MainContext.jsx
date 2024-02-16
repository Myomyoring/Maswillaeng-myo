const ContextProvider = (...Provider) => {
  const MainContextProvider = ({ children }) => {
    let SubContextProvider = children;
    Provider.forEach((Prov) => {
      SubContextProvider = <Prov>{SubContextProvider}</Prov>;
    });
    return SubContextProvider;
  };
  return ({ children }) => <MainContextProvider>{children}</MainContextProvider>;
};

const MainContext = ContextProvider();

export default MainContext;
