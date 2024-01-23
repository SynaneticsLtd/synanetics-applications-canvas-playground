import cors from "cors"
import express from "express"

const app = express()
const port = process.env.PORT || 8081

app.use(cors())

app.get("/", (req, res) => {
  res.json({ message: "Test portal server is running" })
})

app.post("/search", async (req, res) => {
  const libraryRoot = process.env.LIBRARY_ROOT || "http://localhost:8082"

  const result = await fetch(`${libraryRoot}/metadata`)

  const libraryMetadata = (await result.json()) as any

  const panels = []

  for (const panelName in libraryMetadata.panels) {
    const panelVersions = libraryMetadata.panels[panelName]

    for (const panelVersion in panelVersions) {
      const { panelTag, panelPath, description, configurationPath, configurationTag } = panelVersions[panelVersion]

      panels.push({
        id: panels.length,
        panelName,
        panelTag,
        panelPath,
        configurationPath,
        configurationTag,
        libraryRoot: "http://localhost:8082",
        libraryHost: "",
        description,
      })
    }
  }

  res.json({ panels })
})

app.listen(port, () => {
  console.log(`Test portal server is running on port ${port}`)
})
