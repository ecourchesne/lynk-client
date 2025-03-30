const Spinner = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 28 14">
            <rect width="6" height="6" x="1" y="4" fill="currentColor">
                <animate
                    id="svgSpinnersBarsFade0"
                    fill="freeze"
                    attributeName="opacity"
                    begin="0;svgSpinnersBarsFade1.end-0.25s"
                    dur="0.75s"
                    values="1;.2"
                />
            </rect>
            <rect width="6" height="6" x="11" y="4" fill="currentColor" opacity=".4">
                <animate
                    fill="freeze"
                    attributeName="opacity"
                    begin="svgSpinnersBarsFade0.begin+0.15s"
                    dur="0.75s"
                    values="1;.2"
                />
            </rect>
            <rect width="6" height="6" x="21" y="4" fill="currentColor" opacity=".3">
                <animate
                    id="svgSpinnersBarsFade1"
                    fill="freeze"
                    attributeName="opacity"
                    begin="svgSpinnersBarsFade0.begin+0.3s"
                    dur="0.75s"
                    values="1;.2"
                />
            </rect>
        </svg>
    )
}

export default Spinner
