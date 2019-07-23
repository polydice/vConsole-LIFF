workflow "Build and Publish" {
  on = "push"
  resolves = ["Publish"]
}

action "Build" {
  uses = "nuxt/actions-yarn@master"
  args = "install"
}

# Filter for a new tag
action "Tag" {
  needs = "Build"
  uses = "actions/bin/filter@master"
  args = "tag"
}

action "Publish" {
  needs = "Tag"
  uses = "nuxt/actions-yarn@master"
  args = "publish"
  secrets = ["NPM_AUTH_TOKEN"]
}