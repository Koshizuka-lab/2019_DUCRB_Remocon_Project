module View exposing (..)

import Html exposing (Html, div)
import Model exposing (Msg(..), Model)
import View.Lights as Lights
view : Model -> Html Msg
view model =
    div []
        [ Html.map LightsMsg (Lights.view model.lightsModel) ]
        