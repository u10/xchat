express = require 'express'

module.exports = (bs) ->
  router = express.Router()
  router.route '/:uid/:fid'
  .get (req, res) ->
    bs.connect
      room: req.params.uid,
      fileId: req.params.fid,
      timeout: 2000
      onStart: (file) ->
        res.writeHead 200,
          'Content-Type': file.type
          'Content-Length': file.size
          'Content-Disposition': "attachment; filename='#{file.name}'"
        return
      onPipe: (stream) ->
        stream.pipe(res)
        return
      onTimeout: ->
        res.writeHead(404);
        res.end('file not found.');
        return
      onError: () ->
        res.end()
        return
    return
  router
