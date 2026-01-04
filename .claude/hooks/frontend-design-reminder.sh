#!/bin/bash
# Hook: Remind Claude to use the frontend-design skill when modifying frontend files
# This hook triggers on Edit, Write, and MultiEdit operations

# Read the tool input from stdin
input=$(cat)

# Extract the file path from the tool input
file_path=$(echo "$input" | jq -r '.tool_input.file_path // empty')

# If no file_path found, exit silently
if [ -z "$file_path" ]; then
    exit 0
fi

# Define frontend file patterns
frontend_patterns='\.(tsx|jsx|css|scss|sass|less|html|vue|svelte|astro)$'

# Check if the file matches frontend patterns
if echo "$file_path" | grep -qE "$frontend_patterns"; then
    # Output a reminder (this will be shown to Claude)
    cat << 'EOF'
🎨 FRONTEND DESIGN SKILL REMINDER

You are modifying a frontend file. Apply the frontend-design skill guidelines:

• Choose a BOLD aesthetic direction (not generic AI aesthetics)
• Use distinctive typography (avoid Inter, Roboto, Arial)
• Commit to cohesive color themes with dominant colors + sharp accents
• Add meaningful motion/animations for high-impact moments
• Consider unexpected layouts, asymmetry, and visual depth
• NEVER use purple gradients on white or cookie-cutter patterns

Remember: Intentionality matters more than intensity. Execute your vision with precision.

Skill location: .claude/skills/frontend-design.md
EOF
fi

# Always exit 0 to allow the operation to proceed
exit 0
