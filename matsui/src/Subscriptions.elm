module Subscriptions exposing (subscriptions)

import Model exposing (Msg(..), Model)
import Material

subscriptions : Model -> Sub Msg
subscriptions model =
    Material.subscriptions Mdc model
