.PHONY: build
ALL: build
build: Main.elm
	elm make Main.elm --output app.js --optimize
debug: Main.elm
	elm make Main.elm --output app.js
deploy: build
	set -a && source .env && set +a && rsync .env app.js index.html main.css material-components-web.css elm-mdc.js ${RASPI_USER}@${RASPI_ADDR}:${RASPI_SERVER_DIR}
	# ssh ${RASPI_USER}@${RASPI_ADDR} 'cd ${RASPI_SERVER_DIR};'
