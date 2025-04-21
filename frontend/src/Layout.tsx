import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react'
import { Outlet } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'

const App = () => {
    const { logged, user } = useAuthStore()

    useEffect(() => {
        console.log('Logged: ', logged)
        console.log('User: ', user)
    }, [logged])

    return (
        <>
            <div className="fixed -z-10 top-0 left-0 w-full h-[100vh]">
                <ShaderGradientCanvas
                    pixelDensity={2.6}
                    pointerEvents="none"
                    fov={20}
                    style={{ width: '100%', height: '100%', backgroundColor: '#09090b' }}
                >
                    <ShaderGradient
                        control="query"
                        urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=on&bgColor1=%23000000&bgColor2=%23000000&brightness=0.8&cAzimuthAngle=45&cDistance=2.4&cPolarAngle=190&cameraZoom=9&color1=%23616161&color2=%2309090b&color3=%23383838&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=20&frameRate=10&grain=on&lightType=3d&pixelDensity=3&positionX=0&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.2&rotationX=0&rotationY=0&rotationZ=225&shader=positionMix&toggleAxis=false&type=sphere&uAmplitude=0&uDensity=3.7&uFrequency=5.5&uSpeed=0.1&uStrength=0.4&uTime=0&wireframe=false&zoomOut=false"
                    />
                </ShaderGradientCanvas>
            </div>
            <Outlet />
        </>
    )
}

export default App
