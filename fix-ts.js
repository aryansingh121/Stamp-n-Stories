const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  for (const r of replacements) {
    content = content.replace(r.from, r.to);
  }
  fs.writeFileSync(filePath, content);
}

replaceInFile(path.join(__dirname, 'src/lib/logger.ts'), [
  { from: 'metadata: params.metadata || {},', to: 'metadata: (params.metadata as any) || {},' },
  { from: 'metadata: params.metadata || {},', to: 'metadata: (params.metadata as any) || {},' }
]);

replaceInFile(path.join(__dirname, 'src/routes/passport._authenticated.admin.tsx'), [
  { from: 'l.admin?.full_name', to: '(l as any).admin?.full_name' },
  { from: 'l.admin_user_id', to: '(l as any).admin_user_id' },
  { from: '(l: any,', to: '(l: any,' } // fallback
]);

replaceInFile(path.join(__dirname, 'src/routes/passport._authenticated.admin_.activity.tsx'), [
  { from: '(log)', to: '(log: any)' },
  { from: '(log,', to: '(log: any,' },
  { from: 'log.user?.full_name', to: '(log.user as any)?.full_name' }
]);

replaceInFile(path.join(__dirname, 'src/routes/passport._authenticated.admin_.audit.tsx'), [
  { from: '(log)', to: '(log: any)' },
  { from: '(log,', to: '(log: any,' },
  { from: 'log.admin?.full_name', to: '(log.admin as any)?.full_name' },
  { from: 'log.target?.full_name', to: '(log.target as any)?.full_name' }
]);

replaceInFile(path.join(__dirname, 'src/routes/passport._authenticated.discover.tsx'), [
  { from: 'score={profile.score}', to: 'score={(profile as any).score}' },
  { from: 'profile={profile}', to: 'profile={profile as any}' }
]);

replaceInFile(path.join(__dirname, 'src/routes/passport._authenticated.leaderboard.tsx'), [
  { from: 'stamps: profile.stamps', to: 'stamps: profile.stamps as any' }
]);

replaceInFile(path.join(__dirname, 'src/routes/passport._authenticated.passport.tsx'), [
  { from: 'stamps={profile.stamps || []}', to: 'stamps={(profile.stamps as any) || []}' }
]);

console.log("Done fixing types");
