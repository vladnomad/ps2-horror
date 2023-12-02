import React, { Component } from "react"
import GamePrice from "./game-price"
import "../assets/styles/game.css"

import game from "../assets/img/game.png"
import star from "../assets/img/star.png"
import info from "../assets/img/info.png"
import question from "../assets/img/question.png"
import overlay from "../assets/img/overlay.png"

class Game extends Component {
    constructor(props) {
        super(props)
        this.infoButtonRef = React.createRef()
        this.state = {
            priceCategory: "",
            delSrc: props.delSrc,
            clickCount: 0,
            activeClass: "",
            confirmDeleteAria: true,
            focusStyle: { opacity: 0 }
        }
    } 

    handleDeleteClick = () => {
        const { title, onDelete, delSrc } = this.props
        const { clickCount } = this.state
    
        if (clickCount === 0) {
          this.setState({ delSrc: question, clickCount: 1, activeClass: " is-active", confirmDeleteAria: false })
          setTimeout(() => {
            this.setState({ delSrc: delSrc, clickCount: 0, activeClass: "", confirmDeleteAria: true })
          }, 3000)
        } else if (clickCount === 1) {
          onDelete(title)
        }
    }

    handleTabFocus = (e) => {
        this.props.activeButtonRef.current = e.target

        this.setState(() => {
            const newfocusStyle = { opacity: 1 }
            return { focusStyle: newfocusStyle }
        })  
    }

    handleTabBlur = () => {
        this.setState(() => {
            const newfocusStyle = { opacity: 0 }
            return { focusStyle: newfocusStyle }
        })  
    }

    handlePriceClick = (category) => {
        if (this.state.priceCategory === category) return this.setState({ priceCategory: "" })
        this.setState({ priceCategory: category })
    }

    render() {
        const { slug, title, src, wish, play, loose, cib, newg, onMarkState, onOpenInfo, onPriceCategoryChange, priceCategory, wishPriceCategory, activeFilter } = this.props
        const { delSrc, activeClass, focusStyle, confirmDeleteAria } = this.state

        let gameClass = "game",
            valueStatus = "",
            deleteAlt = "Delete game",
            statusContainerClass = "game__status-container"

        if (wish) gameClass += " --wish"
        if (play) gameClass += " --play"
        if (delSrc === question) deleteAlt = "Confirm deletion"
        if (!confirmDeleteAria) statusContainerClass += " is-active"

        switch (priceCategory) {
            case "loose": {
                gameClass += " game--loose"
                valueStatus = "Added to Collection: Loose copy"
                break
            }
            case "cib": {
                gameClass += " game--cib"
                valueStatus = "Added to Collection: CIB copy"
                break
            } 
            case "newg": {
                gameClass += " game--newg"
                valueStatus = "Added to Collection: New copy"
                break
            } 
            default: break
        }

        return (
            <li className={gameClass} id={slug}>
                <div className="game__title-container" style={focusStyle}>
                    <h2 className="game__title">{title}</h2>
                </div>
                <img className="game__cover-img" src={src} alt={"PS2 game cover for " + title} />
                <img className="game__cover-overlay" src={overlay} alt="" />
                <div className={statusContainerClass}>
                    <img className="game__status --wish" src={star} alt="" />
                    <img className="game__status --play" src={game} alt="" />
                    <ul className="a11y" role="status" aria-label="Track the game's status:">
                        { priceCategory !== "" ? <li>{valueStatus}</li> : null }
                        { wish ? <li>Added to Wishlist</li> : null }
                        { play ? <li>Marked as Played</li> : null }
                    </ul>
                </div>
                <div className={"game-buttons" + activeClass} tabIndex={0} role="toolbar" aria-activedescendant={slug + "--toolbar-wish"} aria-label={"Control options for " + title + ":"} onFocus={this.handleTabFocus} onBlur={this.handleTabBlur} onMouseOver={this.handleTabFocus} onMouseOut={this.handleTabBlur} style={focusStyle} >
                    <button type="button" id={slug + "--toolbar-wish"} className="btn-sm btn-wish" onClick={() => onMarkState("wish")} data-toggle="wish">
                        <img className="icon icon-wish" src={star} alt={wish ? "Remove from wishlist" : "Add to wishlist"} />
                    </button>
                    <button type="button" id={slug + "--toolbar-play"} className="btn-sm btn-play" onClick={() => onMarkState("play")} data-toggle="play">
                        <img className="icon icon-played" src={game} alt={play ? "Remove from played" : "Mark as played"} />
                    </button>
                    <button type="button" id={slug + "--toolbar-info"} className="btn-sm btn-info" onClick={() => { onOpenInfo(slug) }} ref={this.infoButtonRef}>
                        <img className="icon icon-info" src={info} alt="Load game data" />
                    </button>
                    <button type="button" id={slug + "--toolbar-delete"} className="btn-sm btn-delete" onClick={this.handleDeleteClick}>
                        <img className="icon icon-delete" src={delSrc} alt={deleteAlt} />
                    </button>
                    <p className={"delete-p" + activeClass} aria-hidden={confirmDeleteAria}>Are you sure?<br/>Click again to delete.</p>
                </div>
                <GamePrice 
                    nav={false} 
                    slug={slug}
                    activeFilter={activeFilter}
                    onPriceCategoryChange={onPriceCategoryChange} 
                    priceCategory={priceCategory} 
                    wishPriceCategory={wishPriceCategory} 
                    loose={loose} 
                    cib={cib} 
                    newg={newg} 
                />
            </li>
        )
    }
}

export default Game