import { Component } from "react"
import game from "../assets/img/game.png"
import star from "../assets/img/star.png"
import ps from "../assets/img/ps-logo.svg"
import search from "../assets/img/search.png"
import del from "../assets/img/del.png"
import menuImg from "../assets/img/plus.svg"
import "../assets/styles/search-panel.css"

class SearchPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchQuery: "",
            searchIconSrc: search,
            wishlist: false
        }
    }

    onSearchUpdate = (e) => {
        const searchQuery = e.target.value
        this.setState({searchQuery})
        this.props.onSearchUpdate(searchQuery)
    }

    onSearchFocus = () => {
        this.setState({ searchIconSrc: del })
    }

    onSearchBlur = () => {
        if (this.state.searchQuery.trim().length === 0) {
            this.setState({ searchIconSrc: search })
        }
    }

    onDeleteClick = () => {
        if (this.state.searchIconSrc === del) {
            this.setState({ searchQuery: "", searchIconSrc: search })
            this.props.onSearchUpdate("")
        }
    }

    render() {
        const { searchQuery, searchIconSrc } = this.state
        const { data, playCount, progressCount, activeFilter, onFilterChange, onAsideChange, progressBarStyle, addGameIsActive, aboutIsActive } = this.props

        const btnGroupAside = (mediaClass) => {
            return (
                <div className={"btn-group--aside" + mediaClass}>
                    <button type="button" className={aboutBtnClass} onClick={() => onAsideChange("aboutIsActive")} tabIndex={0}>
                        <span id="btn-about1"></span>
                        <span id="btn-about2"></span>
                    </button>
                    <button type="button" className={addGameBtnClass} onClick={() => onAsideChange("addGameIsActive")} tabIndex={0}>
                        <img className={addGameImgClass} src={menuImg} alt={addGameMenuAlt}/>
                    </button>
                </div>
            )
        }

        let searchAlt = "Search",
            searchAria = true,
            searchLabel = "Search",
            addGameMenuAlt = "Open add game form",
            addGameImgClass = "menu-img",
            addGameBtnClass = "btn btn-menu",
            aboutBtnClass = "btn btn-about",
            tabIndex = 0

        if (addGameIsActive) { 
            addGameMenuAlt = "Close add game form"
            addGameImgClass += " --active" 
            addGameBtnClass += " --active" 
            aboutBtnClass += " --inactive" 
            tabIndex = -1
        }
        if (aboutIsActive) {
            aboutBtnClass += " --active"  
            addGameBtnClass += " --inactive" 
            tabIndex = -1           
        }
        if (searchIconSrc === del) { 
            searchAlt = "Clear search input"
            searchAria = false
            searchLabel = "Clear" 
        }

        return (
            <nav className="search-panel">
                <div className="mobile-title-wrapper">
                    <img src={ps} width="30px" alt=""/>
                    <h1 className="mobile-title"><span className="a11y">PS2 Game Library — </span>Survival Horror Classics</h1>
                    {btnGroupAside(" mobile")}
                </div>
                <section className="mobile-progress" aria-label="Gaming progress information">
                    <p><span className="a11y">Games played:</span><span>{playCount}</span> / <span className="a11y">Total games:</span><span>{data.length}</span></p>
                    <div className="progress-bar--container">
                        <div className="progress-bar" style={progressBarStyle}></div>
                    </div>
                    <span className="a11y">Percentage progress count:</span>
                    <span className="mobile-progress--span progress-count">{progressCount}</span>
                </section>
                <section className="btn-group" aria-label="Filter controls" aria-describedby="filter-description">
                    <span id="filter-description" className="a11y">Use filters to show games previously marked as played or the ones added to the wishlist. Combine filters and search to look for games under specific filter option.</span> 
                    {btnGroupAside(" desktop")}
                    <button className={`btn ${activeFilter === "all" ? "--active" : ""}`} type="button" tabIndex={tabIndex} onClick={() => onFilterChange("all")}>All games</button>
                    <button className={`play btn ${activeFilter === "play" ? "--active" : ""}`} type="button" tabIndex={tabIndex} onClick={() => onFilterChange("play")}><img className="icon" src={game} alt="" />Played</button>
                    <button className={`btn ${activeFilter === "wish" ? "--active" : ""}`} type="button" tabIndex={tabIndex} onClick={() => onFilterChange("wish")}><img className="icon" src={star} alt="" />Collected</button>
                </section>
                <section className="search-wrapper" aria-label="Search input" aria-describedby="search-description">
                    <span id="search-description" className="a11y">Filter games that have a matching character string in the title with the character string provided by the user in the input field. When input has focus, it's associated button can be used to clear the input.</span>
                    <input type="text" id="search-input" aria-describedby="search-description" placeholder="Enter game title" value={searchQuery} tabIndex={tabIndex} onChange={this.onSearchUpdate} onFocus={this.onSearchFocus} onBlur={this.onSearchBlur} />
                    <button className="search-btn" type="button" aria-hidden={searchAria} tabIndex={tabIndex} onClick={this.onDeleteClick}>
                        <label htmlFor="search-input" className="search-label">{searchLabel}</label>
                        <img className="icon-search" alt={searchAlt} src={searchIconSrc} />
                    </button>
                </section>
            </nav>
        )
    }
}

export default SearchPanel