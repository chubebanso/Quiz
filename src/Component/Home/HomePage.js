import videoHompage from '../../assets/video-homepage.mp4'
import { useSelector } from 'react-redux'
const HomPage = (props) => {
    // const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    // const account = useSelector(state => state.user.account);
    // console.log('account:', account, 'isAuthenticated:', isAuthenticated);
    return (
        <div className="hompage-container">
            <video autoPlay muted loop >
                <source
                    src={videoHompage}
                    type='video/mp4'
                />
            </video>
            <div className='homepage-content'>
                <div className='title-1'>Forms that break the norm</div>
                <div className='title-2'>Get more data—like signups, feedback, and anything else—with
                    forms designed to be refreshingly different.
                </div>
                <div >
                    <button className='title-3'>Get started—it's free</button>
                </div>
            </div>
        </div>
    )
}
export default HomPage