import React from 'react';
import back_ground from "../data/images/back_ground.png";

export const WelcomePage = () => {

    const styles = {
        page: `bg-orange-500 flex direction-column items-center h-screen bg-no-repeat bg-cover`,
        aside: `w-1/2 text-left z-20 lg:ml-80 md:ml-40 ml-20 relative py-10 `,
        website: `text-6xl font-bold mb-4 md:text-8xl`,
        info: `mt-12 lg:w-3/5`,
        into_title: `text-4xl text-left`,
        detail: `text-justify mt-8 text-sm`,
        text: `text-2xl mb-10`,
        button: `bg-black hover:bg-orange-800 lg:hover:scale-[1.8] origin-left transform transition duration-500 hover:scale-[1.2] text-white font-bold py-2 px-4 rounded-md border border-black mt-8 w-80 text-center ms-0 md:w-100`,
        button_pos: `flex justify-center md:justify-start`,

    }

    return (
        <div className={styles.page} style={{ backgroundImage: `url(${back_ground})`, backgroundPosition: `center`, backgroundSize: `8%` }}>
            <aside className={styles.aside} >
                <h1 className={styles.website}>Givingly</h1>
                <div className={styles.info}>
                    <h3 className={styles.into_title}>Supporting great causes made easy</h3>
                    <p className={styles.detail}>We helped over 3.500 projects and causes. Sing in today and get your idea kicked off or support others kick off their amazing projects.</p>
                    <a className={styles.button_pos}><button className={styles.button}>Start today</button></a>
                </div>
            </aside>
        </div>

    )
}
