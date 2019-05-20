module View.Lights exposing (..)

import Html exposing (Html, div, text)
import Model.Lights exposing (Msg(..), Model)
import Material.Button as Button
import Material.Card as Card
import Material.Options as Options
import Material.Options exposing (cs, css, styled)
import Update.Lights exposing (getTestServerResponse)
import Task
import Tuple exposing (first)

import Debug

view : Model -> Html Msg
view model =
    styled div
        [ css "padding" "1rem"
        , css "text-align" "center"
        ]
        [
            Card.view 
            [ css "width" "350px"
            , css "display" "inline-block"
            , css "box-sizing" "border-box"
            , css "width" "150px"
            , css "height" "150px"
            , css "border" "1px solid #f0f0f0" ]
            [ styled div
                [ css "padding" "1rem" ]
                    [ Button.view Mdc
                        "my-button"
                        model.mdc
                        [ Button.ripple
                        , Button.raised
                        , Options.onClick KickTestServer
                        , cs "black"
                        ]
                        [ text model.instance ] ]
            ]
        ]
