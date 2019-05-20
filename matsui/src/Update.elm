module Update exposing (update)

import Model exposing (Msg(..), Model)
import Update.Lights as Lights
import Material

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Mdc msg_ ->
            Material.update Mdc msg_ model

        Click ->
            ( model, Cmd.none )

        LightsMsg subMsg ->
            let
                ( updatedLightsModel, lightsCmd ) =
                    Lights.update subMsg model.lightsModel
            in
                ( { model | lightsModel = updatedLightsModel }
                , Cmd.map LightsMsg lightsCmd
                )
