#!/usr/bin/env node
import { program } from 'commander'
import { serveCommand } from './commands/serve'

program.addCommand(serveCommand)
// .addCommand(publishCommand) example how to chain different commands

program.parse(process.argv)