import Loadable from 'react-loadable';

const LoadingComponent = () => {
    return (
        <div>loading...</div>
    )
}

export default function (loader, loading = LoadingComponent) {
    return Loadable({
        loader,
        loading,
        delay: 300
    });
}