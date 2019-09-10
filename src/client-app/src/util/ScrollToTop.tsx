import {useEffect} from 'react';
import {withRouter} from 'react-router';

export const ScrollToTop = withRouter(({children, location: {pathname}}: any) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return children;
});