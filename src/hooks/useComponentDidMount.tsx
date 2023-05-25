import React, { useRef, useEffect } from 'react';

const useComponentDidMount = () => {
  const ref = useRef() as React.MutableRefObject<boolean>;
  useEffect(() => {
    ref.current = true;
  }, []);
  return ref.current;
};
export default useComponentDidMount;
